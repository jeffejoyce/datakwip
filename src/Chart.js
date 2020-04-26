import React, {useEffect} from 'react';
import Chart from 'chart.js';

function Charts(props) {
    const chartRef = React.createRef();
    useEffect(() => {
        const ch = chartRef.current.getContext("2d");
        new Chart(ch, {
            type: props.cType,
            data: {
                labels: props.cLabels,
                datasets: [
                    {
                        label: props.cName,
                        data: props.cData,
                    }
                ]
            },
        });
    })

    return (
        <canvas
            id="ch"
            ref={chartRef}
        />
    );
}

export default Charts;
