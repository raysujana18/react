import React from "react";
import { getMovieList, searchMovie } from "./api";
import { useEffect,useState } from "react";
import Card from "./Card";
import axios from "axios";
let API_key="&api_key=452489ec1c8dc842bf18e2febca3ee02";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
let arr=["Popular","Theater","Kids","Drama","Comedie"]
const Main=()=>{
    const [movieData,setData] =useState([]);
    const [url_set,setUrl]=useState(url);
    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            setData(data.results);
        })
        axios.get(`${process.env.REACT_APP_BASEURL}/discover/movie`,{
            params: {
                api_key: process.env.REACT_APP_APIKEY,
            }
        }).then((response) => {
            // console.log("datas => ", response.data.results)
            setData(response.data.results)
        })
    },[url_set])

    const getData=(movieType)=>{
        if(movieType==="Popular")
        {
            url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
        }
        if(movieType==="Theater")
        {
            url=base_url+"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+API_key;
        }
        if(movieType==="Kids")
        {
            url=base_url+" /discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+API_key;
        }
        if(movieType==="Drama")
        {
            url=base_url+"/discover/movie?with_genres=18&primary_release_year=2014"+API_key;
        }
        if(movieType==="Comedie")
        {
            url=base_url+"/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc"+API_key;
        }
        setUrl(url);
    }
    const search = async (q) =>{
        if (q.length > 3) {
            const query = await searchMovie(q)
            url=base_url+"/search/movie?api_key=452489ec1c8dc842bf18e2febca3ee02&query="+search;
            setUrl(url)
            setData(query.results)
        }
    }
    return(
        <>
        <div className="header">
            <nav>
                <ul>
                    {
                        arr.map((value)=> {
                            return(
                                <li><a href="#" name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                            )
                        })
                    }
                </ul>
            </nav>
            <form>
                <div className="search-btn">
                    <input type="text" placeholder="Enter Movie Name" className="inputText" onChange={({target}) => search(target.value)}>
                    </input>
                    <button><i class="fas fa-search"></i></button>

                </div>
            </form>
        </div>
        <div className="container">
        {movieData.map((results, index) =>{
            return(
                <Card info={results} key={index}/>
            )
        })}
        </div>
        </>
    )
}
export default Main;