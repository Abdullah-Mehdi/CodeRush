package com.coderush.codeeditor;

import com.coderush.problem.Problem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CodeEditor {
    // Attributes
    private String templateCode; // Template code loaded for the specific problem
    private Problem problem;
}

