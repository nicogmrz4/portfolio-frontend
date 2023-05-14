import { experienceErr } from "src/app/interfaces/errors/experienceErr";

export let experienceErrModel: experienceErr  = {
    company: {
        NotBlank: "",
        Size: "",
    },
    description: {
        NotBlank: "",
        Size: "",
    },
    job: {
        NotBlank: "",
        Size: "",
    },
    periodFrom: {
        NotBlank: "",
        Pattern: ""
    },
    periodAt: {
        NotBlank: "",
        Pattern: ""
    }
}