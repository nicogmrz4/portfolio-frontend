export interface projectErr {
    url: {
        NotBlank: string,
        Size: string,
        Pattern: string
    },
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