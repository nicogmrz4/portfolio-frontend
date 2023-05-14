export interface projectErr {
    title: {
        NotBlank: string,
        Size: string
    },
    description: {
        NotBlank: string,
        Size: string        
    }
    createdAt: {
        NotBlank: string,
        Pattern: string
    }
}