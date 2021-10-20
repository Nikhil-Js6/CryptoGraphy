import React, {useState} from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from "./Loader";

const { Title, Text } = Typography;
const { Option } = Select;

const demoImg = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

function News({ simplified }){
    const [newsCategory, setNewsCategory]= useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
    const { data: cryptosList } = useGetCryptosQuery(100);


    if(!cryptoNews) return <Loader/>;

    return(
       <div>
            <Row gutter={[24, 24]}>
                { !simplified && (
                   <Col span={24}>
                       <Select
                           showsearch
                           className="select-news"
                           placeholder="Select a Crypto"
                           optionFilterProp="children"
                           onChange={(value) => setNewsCategory(value)}
                           filterOption={(input, option)=> option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                       >
                            <Option value="Cryptocurrency">Cryptocurrency</Option>
                            {cryptosList?.data?.coins.map((coin)=>(
                                <Option value={coin.name}>{coin.name}</Option>
                            ))}
                       </Select>
                   </Col>
                )}
                {
                  cryptoNews?.value.map((news=>(
                    <Col xs={24} sm={12} lg={12}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div style={{display: 'flex'}} >
                                    <Title level={4} className="news-title">{news.name}</Title>
                                      <img style={{ maxWidth: '100px', maxHeight: '100px' }} src={ news?.image?.thumbnail?.contentUrl || demoImg } alt="news"/>
                                </div>
                                <p>
                                    { news.description > 10
                                       ? `${ news.description.substring(0, 10) } ...`
                                       : news.description
                                    }
                                </p>
                                <div style={{marginTop: '2rem'}} className="provider-container">
                                    <div>
                                        <Avatar src={ news.provider[0]?.image?.thumbnail?.contentUrl || demoImg } alt=""/>
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{ moment(news.datePublished).startOf('ss').fromNow() }</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                )))}
            </Row>
       </div>
    )
}

export default News;
