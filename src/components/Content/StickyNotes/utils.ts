import { TaskStatus } from "@/type/enum/TaskStatus";

const getClassNameByStatus = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.PROCESSING:
            return "processing";
        case TaskStatus.TODO:
            return "todo";
        case TaskStatus.DONE:
            return "done";
        case TaskStatus.ABONDON:
            return "abondon";
        default:
            return "todo";
    }
};

export { getClassNameByStatus };
