import { issuePathInfo } from "./issuepath.js";
import { userPathInfo } from "./userpath.js";

export const pathInfo = {
    paths: {
        ...userPathInfo,
        ...issuePathInfo
    }
}