export interface educationErr {
    name: {
        NotBlank: string,
        Size: string,
    },
    career: {
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