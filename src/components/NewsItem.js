import React from 'react'

export default function NewsItem (props) {

    const {title,description,urlToImage,url,publishedAt,author,source}=props.articles;
    let currentDate = new Date();
    let publishDate=new Date(publishedAt); 
    let date=publishDate.toDateString();
    let total=currentDate.getTime()-publishDate.getTime()
    
  const calculateTime=()=>{
    let hours = Math.floor(total / (60 * 60 * 1000));
    let minutes =Math.floor (total / (60 * 1000)) % 60;
    let seconds =Math.floor (total / 1000) % 60;
   // console.log(hours+" hr "+minutes+" min "+seconds+" sec");
   // console.log(publishDate.getTime());
    if (hours<1) {
      if (minutes<=1) {
        return seconds+"sec ago";
      }
      return minutes+"min ago";
    }
    return hours+"hr ago"
  }
//console.log(author);
    return (
        <div className="card" >
        <img src={urlToImage} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{!(title)? " ":title.slice(0,100)}... <span className="badge bg-secondary">{source.name}</span></h5>
          <p className="card-text">{!(description)? " ":description.slice(0,100)}... </p>
          <p className="card-text"><small className="text-muted">By {author? author:"Unknown"} {(date===currentDate.toDateString())? "Today": date} {(calculateTime()>=24)? "yesterday":calculateTime()}</small></p>
          <a href={url} className="btn btn-primary">Read More</a>
        </div>
      </div>
    )
  
}
