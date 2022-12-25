import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './spinner';
// import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }
    //  static PropTypes = {
    //    country:PropTypes.string,
    //    pageSize:PropTypes.number,
    //    category:PropTypes.string,
    //   }
    //  capitalizeFirstLetter=(string)=>{
    //     return string.charAt(0).toUpperCase()+string.slice(1);
    //  }
    constructor(props) {
        super();
        // console.log("hello i am a constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
       // document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
    }
    // // async updateNews(){
    // //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f921c944cdc43de9b1c395547fb3c03&page=1`;
    // //     this.setState({ loading: true });
    // //     let data = await fetch(url);
    // //     let parsedData = await data.json()
    // //     console.log(parsedData);
    // //     this.setState({
    // //         articles: parsedData.articles,
    // //         totalResults: parsedData.totalResults,
    // //         loading: false
    // //     })
    // }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f921c944cdc43de9b1c395547fb3c03&page=${this.state.page}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
      //  this.updateNews();
    }
    handlePrevClick = async () => {
        console.log("prev");

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f921c944cdc43de9b1c395547fb3c03&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
        // this.setState({page:this.state.page - 1})
        // this.updateNews();
    }
    handleNextClick = async () => {
        console.log("next");
        // if(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f921c944cdc43de9b1c395547fb3c03&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
        // }
        //  this.setState({page:this.state.page + 1})
        //  this.updateNews();
    }
    //  {this.capitalizeFirstLetter(this.props.category)}
    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>NewsMonkey - Top headlines </h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url} >
                            <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} author={element.author} date={element.publishedAt} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} />
                        </div>
                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
                </div>
            </div>
        )
    }
}

export default News
