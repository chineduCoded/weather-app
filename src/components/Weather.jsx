import React, { useState } from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading';
import cold from "./assets/cold.jpg"
import warm from "./assets/warm.jpg"

const api = {
    key: "01db9656be3c89969f2660a14f60aeb9",
    url: "https://api.openweathermap.org/data/2.5/"
}


export const Weather = ({ info }) => {
    
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const search = (e) => {
        if(e.key === "Enter") {
            fetch( `${api.url}weather?q=${query}&units=metric&appid=${api.key}` )
                .then((res) => res.json())
                .then((result) => {
                    setWeather(result)
                    setQuery("")
                    console.log(result)
                })
        }
    }



    const dateBuilder = (d) => {
        const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        const day = days[d.getDay()];
        const date = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        return `${day} ${date} ${month}, ${year}`
    } 

   
    return (
       <Container current={info}>
           <Wrapper>
               <Content>
                   <Header>Simple Weather App</Header>
                <SearchBox>
                    <Input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    onKeyPress={search} />
                </SearchBox>
                {(typeof weather.main != "undefined") ? (
                    <Main>
                        <LocationBox>
                    <Location>{weather.name}, {weather.sys.country}</Location>
                    <DateHolder>{dateBuilder(new Date())}</DateHolder>
                </LocationBox>
                <WeatherBox>
                    <Temp>{Math.round(weather.main.temp)}°C</Temp>
                    <SunChange>
                        <span>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en')}</span>
                        <span>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString('en')}</span>
                    </SunChange>
                    <WeatherHolder>{weather.weather[0].description}</WeatherHolder>
                    <Humidity>Humidity: {weather.main.humidity}%</Humidity>
                </WeatherBox>
                    </Main>
                ):(
                    <Loader>
                        <ReactLoading type={"bars"} color={"#fff"} height={'70%'} width={'70%'} />
                    </Loader>
                )}
               </Content>
           </Wrapper>
       </Container>
    )
}

const Loader = styled.div`
padding-top: 100px;
display: flex;
justify-content: center;
align-items: center;
`;

const Main = styled.div`
text-align: center;
`;

const Humidity = styled.div`
color: #fff;
font-size: 20px;
font-weight: 300px;
font-style: italic;
text-align: center;
text-shadow: 2px 2px rgba(50, 50, 50, 0.5);
`;

const WeatherHolder = styled.div`
color: #fff;
font-size: 35px;
font-weight: 700;
text-shadow: 3px 3px rgba(50, 50, 50, 0.5);
text-transform: capitalize;
`;

const SunChange = styled.div`
display: flex;
justify-content: center;
flex-direction: column;

span {
color: #fff;
font-size: 20px;
font-weight: 300px;
font-style: italic;
text-align: center;
text-shadow: 2px 2px rgba(50, 50, 50, 0.5);
}
`;

const Temp = styled.div`
position: relative;
display: inline-block;
margin: 20px auto;
background-color: rgba(255, 255, 255, 0.2);
border-radius: 16px;
padding: 15px 25px;
color: #fff;
font-size: 80px;
font-weight: 900;
text-align: center;
text-shadow: 3px 6px rgba(50, 50, 50, 0.5);
box-shadow: 3px 6px rgba(0, 0, 0, 0.2);
`;

const WeatherBox = styled.div`
text-align: center;
`;

const DateHolder = styled.div`
color: #fff;
font-size: 20px;
font-weight: 300px;
font-style: italic;
text-align: center;
text-shadow: 2px 2px rgba(50, 50, 50, 0.5);
`;

const Location = styled.div`
color: #fff;
font-size: 32px;
font-weight: 500px;
text-align: center;
text-shadow: 3px 3px rgba(50, 50, 50, 0.5);
`;

const LocationBox = styled.div`
padding-top: 40px;
`;

const Input = styled.input`
width: 100%;
height: 50px;
padding: 15px;
border-radius: 0px 16px 0px 16px;
appearance: none;
border: 0;
outline: none;
background: none;
background-color: rgba(255, 255, 255, 0.5);
box-shadow: 0px 5px rgba(0, 0, 0, 0.2);
color: #313131;
font-size: 20px;
transition: 0.35ms ease;

:focus {
    background-color: rgba(255, 255, 255, 0.75);
}
`;

const SearchBox = styled.div`
display: flex;
justify-content: center;
`;

const Header = styled.div`
color: #fff;
font-size: 30px;
font-weight: 300px;
text-align: center;
text-shadow: 3px 3px rgba(50, 50, 50, 0.5);
margin-bottom: 15px;
`;

const Content = styled.div`
width: 400px;
height: 100vh;
padding: 0 2rem;

`;

const Wrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.75));
padding-top: 25px;
`;

const Container = styled.div`
width: 100%;
height: 100%;
background-image: ${(props) => props.current === "cold" ? `url(${warm})` : `url(${cold})`};
background-size: cover;
background-position: bottom;
transition: all 350ms ease-out;
`;