import { skillErr } from "src/app/interfaces/errors/skillErr";

export let skillErrModel: skillErr = {
    name: {
        NotBlank: '',
        Size: '',
    },
    percentage: {
        NotBlank: '',
        Range: '',
    }
}