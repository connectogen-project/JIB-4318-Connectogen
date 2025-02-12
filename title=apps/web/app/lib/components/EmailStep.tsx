export function EmailStep({ onNext, formData, setFormData }: EmailStepProps) {
    const [email, setEmail] = useState(formData.email || "")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!email.endsWith(".edu")) {
        setError("Please enter a valid .edu email address")
        return
      }
      onNext({ email: email.trim().toLowerCase() })
    }

    return (
      // Rest of the component code...
    )
} 