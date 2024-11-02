public class SolutionTest {
    //testCase;
    //solution
    @Test
    public void testTwoSum() {

        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] expected = {0, 1};

        int[] result = solution.twoSum(nums, target);
        assertArrayEquals(expected, result);
    }
}