import { TaskStatus } from "@/type/enum/TaskStatus";
import { stat } from "fs";

const getClassNameByStatus = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.PROCESSING:
            return "processing";
        case TaskStatus.TODO:
            return "todo";
        case TaskStatus.DONE:
            return "done";
        case TaskStatus.OVERDUE:
            return "overdue";
        default:
            return "todo";
    }
};

export { getClassNameByStatus };
