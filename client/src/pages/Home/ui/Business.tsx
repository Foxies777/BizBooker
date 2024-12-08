interface BusinessProps {
    id: string
    title: string
    description: string
}

const Business = ({ title, description }: BusinessProps) => {
    const modal = () => {
        console.log("Записаться курсу")
    }
    
    return (
        <>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={modal}>Записаться</button>
        </>
    )
}

export default Business
