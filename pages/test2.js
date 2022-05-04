import React from 'react'
import PieChart from '../components/hooks/pie'

const test2 = () => {
    const radius = 70   
    const data = [{ label: 'Furniture', value: 6338.13 }, { label: 'Office Supplies', value: 5271.464 }, { label: 'Technology', value: 5821.556 }];
    return (
        <div>
            <PieChart data={data} outerRadius={200} innerRadius={radius}/>
        </div>
    )
}

export default test2
