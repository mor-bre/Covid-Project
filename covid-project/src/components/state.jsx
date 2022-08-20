import '../css/state.css';
import '../css/App.css';
import ByStateChart from './byStateChart';
import InfoBox from './infoBox';

const State = (props) => {
    let { item } = props;

    return (
        <div className="by-state">
            <h3>{item.state}</h3>
            <div className="state-info">
                <InfoBox
                    mainTitle='Cases'
                    secondaryTitle={['New Cases', 'Total Cases']}
                    content={[item.positiveIncrease, item.positive]}
                    isBig={false}>
                </InfoBox>
                <InfoBox
                    mainTitle='Hospitalizations'
                    secondaryTitle={['Currently hospitalized', 'Total hospitalized']}
                    content={[item.hospitalizedCurrently, item.hospitalized]}
                    isBig={false}>
                </InfoBox>
                <InfoBox
                    mainTitle='Deaths'
                    secondaryTitle={['New deaths', 'Total deaths']}
                    content={[item.deathIncrease, item.death]}
                    isBig={false}>
                </InfoBox>
                <InfoBox
                    mainTitle='Tests'
                    secondaryTitle={['Positive increase', 'Negative Increase']}
                    content={[item.positiveIncrease, item.negativeIncrease]}
                    isBig={false}>
                </InfoBox>
            </div>
            <ByStateChart chartData={item} />
        </div>
    )
}

export default State;