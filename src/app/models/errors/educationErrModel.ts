import { educationErr } from "src/app/interfaces/errors/educationErr";

export let educationErrModel: educationErr = {
    name: {
        NotBlank: "",
        Size: "",
    },
    career: {
        NotBlank: "",
        Size: "",
    },
    description: {
        NotBlank: "",
        Size: "",
    },
    periodFrom: {
        NotBlank: "",
        Pattern: "",
    },
    periodAt: {
        NotBlank: "",
        Pattern: "",
    }
}