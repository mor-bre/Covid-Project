const TotalResults = (props) => {
    const { title, content } = props;

    return (
        <div className="total-result">
            <h4>{title}</h4>
            <p>{content?.toLocaleString("en-US")}</p>
        </div>
    );
}

export default TotalResults;