const API_KEY = "904b660389msh6a9285a005ef768p175becjsn4656b014a0a5"; // Get yours for free at https://rapidapi.com/organization/judge0

const AUTH_HEADERS = API_KEY ? {
    "X-RapidAPI-Key": API_KEY
} : {};

var defaultUrl = localStorageGetItem("api-url") || "https://judge0-ce.p.rapidapi.com";
var extraApiUrl = "https://judge0-extra-ce.p.rapidapi.com";

if (location.hostname == "ide.judge0.com") {
    defaultUrl = "https://ce.judge0.com";
    extraApiUrl = "https://extra-ce.judge0.com";
}

var apiUrl = defaultUrl;
var wait = ((localStorageGetItem("wait") || "false") === "true");
const INITIAL_WAIT_TIME_MS = 500;
const WAIT_TIME_FUNCTION = i => 100 * i;
const MAX_PROBE_REQUESTS = 50;

var blinkStatusLine = ((localStorageGetItem("blink") || "true") === "true");

var fontSize = 14;

var layout;

var sourceEditor;
var stdinEditor;
var stdoutEditor;

var isEditorDirty = false;
var currentLanguageId = 62;  // Java language id

var $selectLanguage;
var $compilerOptions;
var $commandLineArguments;
var $insertTemplateBtn;
var $runBtn;
var $statusLine;

var timeStart;
var timeEnd;

var layoutConfig = {
    settings: {
        showPopoutIcon: false,
        reorderEnabled: true
    },
    dimensions: {
        borderWidth: 3,
        headerHeight: 22
    },
    content: [{
        type: "column",
        content: [{
            type: "component",
            height: 70,
            componentName: "source",
            id: "source",
            title: "SOURCE",
            isClosable: false,
            componentState: {
                readOnly: false
            }
        }, {
            type: "stack",
            content: [{
                type: "component",
                componentName: "stdin",
                id: "stdin",
                title: "Input",
                isClosable: false,
                componentState: {
                    readOnly: false
                }
            }, {
                type: "component",
                componentName: "stdout",
                id: "stdout",
                title: "Output",
                isClosable: false,
                componentState: {
                    readOnly: true
                }
            }]
        }]
    }]
};

function encode(str) {
    return btoa(unescape(encodeURIComponent(str || "")));
}

function decode(bytes) {
    var escaped = escape(atob(bytes || ""));
    try {
        return decodeURIComponent(escaped);
    } catch {
        return unescape(escaped);
    }
}

function localStorageSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (ignorable) {}
}

function localStorageGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (ignorable) {
    return null;
  }
}

function showError(title, content) {
    $("#site-modal #title").html(title);
    $("#site-modal .content").html(content);
    $("#site-modal").modal("show");
}

function handleError(jqXHR, textStatus, errorThrown) {
    showError(`${jqXHR.statusText} (${jqXHR.status})`, `<pre>${JSON.stringify(jqXHR, null, 4)}</pre>`);
}

function handleRunError(jqXHR, textStatus, errorThrown) {
    handleError(jqXHR, textStatus, errorThrown);
    $runBtn.removeClass("loading");
}

function handleResult(data) {
    const tat = Math.round(performance.now() - timeStart);
    console.log(`It took ${tat}ms to get submission result.`);

    const status = data.status;
    const stdout = decode(data.stdout);
    const compile_output = decode(data.compile_output);
    const time = (data.time === null ? "-" : data.time + "s");
    const memory = (data.memory === null ? "-" : data.memory + "KB");

    $statusLine.html(`${status.description}, ${time}, ${memory} (TAT: ${tat}ms)`);

    if (blinkStatusLine) {
        $statusLine.addClass("blink");
        setTimeout(function() {
            blinkStatusLine = false;
            localStorageSetItem("blink", "false");
            $statusLine.removeClass("blink");
        }, 3000);
    }

    const output = [compile_output, stdout].join("\n").trim();

    stdoutEditor.setValue(output);

    if (output !== "") {
        let dot = document.getElementById("stdout-dot");
        if (!dot.parentElement.classList.contains("lm_active")) {
            dot.hidden = false;
        }
    }

    $runBtn.removeClass("loading");
}

function run() {
    if (sourceEditor.getValue().trim() === "") {
        showError("Error", "Source code can't be empty!");
        return;
    } else {
        $runBtn.addClass("loading");
    }

    document.getElementById("stdout-dot").hidden = true;

    stdoutEditor.setValue("");

    var x = layout.root.getItemsById("stdout")[0];
    x.parent.header.parent.setActiveContentItem(x);
	
	var userCode = sourceEditor.getValue();
    var sourceValue = encode(userCode);
    var stdinValue = encode(stdinEditor.getValue());
    var languageId = resolveLanguageId($selectLanguage.val());
    var compilerOptions = $compilerOptions.val();
    var commandLineArguments = $commandLineArguments.val();

    var data = {
        source_code: sourceValue,
        language_id: languageId,
        stdin: stdinValue,
        compiler_options: compilerOptions,
        command_line_arguments: commandLineArguments,
        redirect_stderr_to_stdout: true
    };

    var sendRequest = function(data) {
        timeStart = performance.now();
        $.ajax({
            url: apiUrl + `/submissions?base64_encoded=true&wait=${wait}`,
            type: "POST",
            async: true,
            contentType: "application/json",
            data: JSON.stringify(data),
            headers: AUTH_HEADERS,
            success: function (data, textStatus, jqXHR) {
                console.log(`Your submission token is: ${data.token}`);
                if (wait) {
                    handleResult(data);
                } else {
                    setTimeout(fetchSubmission.bind(null, data.token, 1), INITIAL_WAIT_TIME_MS);
                }
            },
            error: handleRunError
        });
    }

    sendRequest(data);
}

function fetchSubmission(submission_token, iteration) {
    if (iteration >= MAX_PROBE_REQUESTS) {
        handleRunError({
            statusText: "Maximum number of probe requests reached",
            status: 504
        }, null, null);
        return;
    }

    $.ajax({
        url: apiUrl + "/submissions/" + submission_token + "?base64_encoded=true",
        type: "GET",
        async: true,
        accept: "application/json",
        headers: AUTH_HEADERS,
        success: function (data, textStatus, jqXHR) {
            if (data.status.id <= 2) { // In Queue or Processing
                $statusLine.html(data.status.description);
                setTimeout(fetchSubmission.bind(null, submission_token, iteration + 1), WAIT_TIME_FUNCTION(iteration));
                return;
            }
            handleResult(data);
        },
        error: handleRunError
    });
}

function changeEditorLanguage() {
    monaco.editor.setModelLanguage(sourceEditor.getModel(), "java");
    $selectLanguage.val(62);  // Java language selection
    $(".lm_title")[0].innerText = fileNames[currentLanguageId];
    apiUrl = resolveApiUrl(currentLanguageId);
}

function insertTemplate() {
    sourceEditor.setValue(javaSource);
    stdinEditor.setValue("");
    $compilerOptions.val("");
    changeEditorLanguage();
}

function resolveApiUrl(id) {
    return defaultUrl;
}

function editorsUpdateFontSize(fontSize) {
    sourceEditor.updateOptions({fontSize: fontSize});
    stdinEditor.updateOptions({fontSize: fontSize});
    stdoutEditor.updateOptions({fontSize: fontSize});
}

$(window).resize(function() {
    layout.updateSize();
});

$(document).ready(function () {
    updateScreenElements();

    console.log("Hey, Judge0 IDE is open-sourced: https://github.com/judge0/ide. Have fun!");

    $selectLanguage = $("#select-language");
    $selectLanguage.val(62); // Java language selection
    $selectLanguage.change(function () {
        if (!isEditorDirty) {
            insertTemplate();
        } else {
            changeEditorLanguage();
        }
    });

    $runBtn = $("#run-btn");
    $runBtn.click(function () {
        run();
    });

    $statusLine = $("#status-line");

    $(document).on("keydown", "body", function (e) {
        var keyCode = e.keyCode || e.which;
        if ((e.metaKey || e.ctrlKey) && keyCode === 13) { // Ctrl + Enter, CMD + Enter
            e.preventDefault();
            run();
        }
    });

    require(["vs/editor/editor.main"], function () {
        layout = new GoldenLayout(layoutConfig, $("#site-content"));

        layout.registerComponent("source", function (container, state) {
            sourceEditor = monaco.editor.create(container[0], {
                value: javaSource,
                language: "java",
                theme: "vs-light",
                fontSize: fontSize,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true
            });
        });

        layout.registerComponent("stdin", function (container, state) {
            stdinEditor = monaco.editor.create(container[0], {
                value: "",
                language: "plaintext",
                theme: "vs-light",
                fontSize: fontSize,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true
            });
        });

        layout.registerComponent("stdout", function (container, state) {
            stdoutEditor = monaco.editor.create(container[0], {
                value: "",
                language: "plaintext",
                theme: "vs-light",
                fontSize: fontSize,
                readOnly: true,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true
            });
        });

        layout.init();

        insertTemplate();
    });
});
