interface BusinessProps {
    id: number;
    title: string;
    description: string;
}

const Business = ({ id, title, description }: BusinessProps) => {
    const modal = () => {
        console.log("Записаться курсу");
    };
    return (
        <div key={id}>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={modal}>Записаться</button>
        </div>
    );
};

export default Business;
