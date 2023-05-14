export interface experienceErr {
    company: {
        NotBlank: string,
        Size: string,
    },
    job: {
        NotBlank: string,
        Size: string,
    },
    description: {
        NotBlank: string,
        Size: string,
    },
    periodFrom: {
        NotBlank: string,
        Pattern: string,
    },
    periodAt: {
        NotBlank: string,
        Pattern: string,
    }
}