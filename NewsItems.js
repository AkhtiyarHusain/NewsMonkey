import React, { Component } from 'react'

export class NewsItems extends Component {
  
  render() {
    let {title , description ,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div className="my-3">
       <div  className="card" >
       <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"/>
       {source}
  <img src={!imageUrl?"https://www.digitaltrends.com/wp-content/uploads/2022/02/alder-lake-mobility-chip.jpg?resize=1200%2C630&p=1":imageUrl}  className="card-img-top" alt="..."/>
  <div  className="card-body">
    <h5  className="card-title">{title} 
    <span className="visually-hidden">unread messages</span></h5>
    <p  className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted"> By {!author?"ByUnknown":author} on {new Date (date).toGMTString()}</small></p>
    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
  </div>
</div>
       
      </div>
    )
  }
}

export default NewsItems
