import { projectErr } from "src/app/interfaces/errors/projectErr";

export let projectErrModel: projectErr = {
    title: {
        NotBlank: '',
        Size: ''
    },
    description: {
        NotBlank: '',
        Size: '',
    },
    createdAt: {
        NotBlank: '',
        Pattern: ''
    }
}