import React, { useEffect, useState } from "react";
import { csv, arc, scaleBand } from "d3";
import { scaleLinear } from "d3";
import { max } from "d3";



const Test = () => {
    let [ data, setData ] = useState([])
    const dataUrl = "https://gist.githubusercontent.com/gentlesammy/8890aec15f59546b949ce8b1b5ab9ecf/raw/9d62a702bb23487d7d2cb9a5a94f159147a2c082/topten.csv"
    const colorList = [
                        "#1F1FDB", "#0D0D5C", "#6363E1", "#10128F", "#0047AB", 
                        "#6495ED", "#00FFFF", "#00008B", "#6082B6", "#3F00FF", "#5D3FD3"
                      ];
    function random(mn, mx) {
        return Math.random() * (mx - mn) + mn;
    }

    const height =  500
    const width = 960
    const margin ={top: 50, right: 50, bottom: 50, left: 200}
  
    useEffect(() => {
        csv(dataUrl).then(setData);
        
    },[])
    
    if(!data){
        return (
            <h2>LOADING DATA ...............</h2>
        )
    }


    const innerHeight = height -margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right
    //category title
    const yScale = scaleBand()
    .domain(data.map(d => d['Sub-Category']))
    .range([0, innerHeight]);

    //Sales
    const xScale = scaleLinear()
    .domain([0, max(data, d => parseFloat(d["Sales"]) )])
    .range([0, innerWidth])

    

    return (
        <>
            <h1 style={{textAlign: "center"}}>Sales By Top 10 (Sub-Category) </h1>
            <svg  height={height} width={width}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>

                    {
                        xScale.ticks().map((tickValue, i) => (
                            <g transform={`translate(${xScale(tickValue)}, 0)`} key={i}>
                                <line  y2={innerHeight + 20} stroke="black" />
                                <text y={innerHeight + 30} style={{textAnchor: "middle"}}>{tickValue}</text>
                            </g>
                        ))
                    }

                    {
                        yScale.domain().map((tickValue, i) => (
                                <text style={{textAnchor: "end", fill:colorList[i]}} x={-5} y={yScale(tickValue)} dy="1.2rem" key={i}>{tickValue}</text>
                        ))
                    }


                    {
                        data.map((d, i) => (
                            <rect x={0} y={yScale(d['Sub-Category'])}
                                width={xScale(d["Sales"])} 
                                height={30} 
                                style={{fill:colorList[i]}}
                                key={i}/>
                        ))
                    }
                </g> 
            </svg>
        </>
    )
}

export default Test
