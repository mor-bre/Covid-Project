const InfoBox = (props) => {
    const { mainTitle, secondaryTitle, content, isBig } = props;

    return (
        <div className={`info-box ${isBig ? "big" : "small"}`}>
            <h3>{mainTitle}</h3>
            <div></div>
            {Array.isArray(secondaryTitle) ?
                <div>
                    <h4>{secondaryTitle[0]}</h4>
                    <p>{content[0] ? content[0].toLocaleString("en-US") : "Not Reported"}</p>
                    <h4>{secondaryTitle[1]}</h4>
                    <p>{content[1] ? content[1].toLocaleString("en-US") : "Not Reported"}</p>
                </div> :
                <div>
                    <h4>{secondaryTitle}</h4>
                    <p>{content ? content.toLocaleString("en-US") : "Not Reported"}</p>
                </div>
            }
        </div>
    );
}

export default InfoBox;