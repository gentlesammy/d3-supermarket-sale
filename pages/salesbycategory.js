import React, { useEffect, useState } from "react";
import { csv, arc, scaleBand } from "d3";
import { scaleLinear } from "d3";
import { max } from "d3";



const Test = () => {
    let [ data, setData ] = useState([])
    const dataUrl = "https://gist.githubusercontent.com/gentlesammy/a9661a27a9ac889e1a5d5485289ed00b/raw/f7805b6f04773306ff9362aa27d07733e320aeb9/salesbycategory.csv"
    const colorList = ["#1F1FDB", "#0D0D5C", "#6363E1", "#10128F"];
    function random(mn, mx) {
        return Math.random() * (mx - mn) + mn;
    }

    const height =  200
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
    .domain(data.map(d => d.Category))
    .range([0, innerHeight]);

    //Sales
    const xScale = scaleLinear()
    .domain([0, max(data, d => parseFloat(d[" Sales"]) )])
    .range([0, innerWidth])

    console.log(xScale.ticks())

    return (
        <>
            <h1 style={{textAlign: "center"}}>Sales By Category</h1>
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
                                <text style={{textAnchor: "end"}} x={-5} y={yScale(tickValue)} dy=".8rem" key={i}>{tickValue}</text>
                        ))
                    }


                    {
                        data.map((d, i) => (
                            <rect x={0} y={yScale(d.Category)}
                                width={xScale(d[" Sales"])} 
                                height={20} 
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
