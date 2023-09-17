export interface BlogData {
  blog_id: number
  description: string
  headline: string
  published: any
}

export interface CreateFormType {
  handleOnChange: (type: string, value: string) => void
  handleSubmit: () => void
  title: string
  description: string,
  error: string
}

export interface BlogDetailsProps {
  params: {
    slug: string
  }
}
