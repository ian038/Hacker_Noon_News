import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      }
    },
    style: {
        textAlign: 'center'
      }
  }));

export default function News() {
    const classes = useStyles();

    const [ news, setNews ] = useState([]);
    const [ search, setSearch ] = useState('');
    const [ url, setUrl ] = useState('http://hn.algolia.com/api/v1/search?');
    const [ loading, setLoading ] = useState(false);
  
    // Fetch news
    useEffect(() => {
      const fetchNews = async () => {
        setLoading(true);
        await fetch(url)
              .then(res => res.json())
              .then(res => {
                setNews(res.hits) 
                setLoading(false)
              })
              .catch(err => console.log(err))
      }
      fetchNews();
    }, [url]);
  
    const handleSubmit = e => {
      e.preventDefault();
      setUrl(`http://hn.algolia.com/api/v1/search?query=${search}`)
    }

    const showLoading = () => {
        return loading ? <CircularProgress /> : null 
    }

    const searchForm = () => {
        return <form onSubmit={handleSubmit} className={classes.root}>
                    <Input
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)} 
                    name="search"
                    />
                    <Button color="primary" onClick={handleSubmit}>Search</Button>
                    {showLoading()}
                </form>
    }

    const content = () => {
        return news.map((news, i) => <p key={i}>{news.title} <br /> {news.url}</p> )
    }

    return (
        <div className={classes.style}>
        <h1>News</h1>
        {searchForm()}
        {content()}
        </div>
    )
}
