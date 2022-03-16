import React from 'react';

const PcrDetails = ({result, positiveResult}) => {
    return (
        <div>
            Результат
            {result.map(res => <div> {res.labResult? 'Отрицательный': null} {positiveResult? 'Положитьельный': null}
            <div>
                Анализ {res && res.analizName.length > 20? res.analizName.slice(0, -138): res.analizName}
                { positiveResult && positiveResult.length > 20? positiveResult.analizName.slice(0, -138): null}
            </div>
            </div>)}
        </div>
    )
};

export default PcrDetails;