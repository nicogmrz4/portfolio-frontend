export interface skillErr {
    name: {
        NotBlank: string,
        Size: string,
    },
    percentage: {
        NotBlank: string,
        Range: string,
    }
}