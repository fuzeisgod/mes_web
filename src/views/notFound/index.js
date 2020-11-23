import React from 'react'
import {
    Result,
    Button
} from 'antd'
import './not-found.less'

export default function NotFound(props) {
    const back = () => {
        props.history.go(-1)
    }
    return (
        <div className="notfound_page">
            <Result
                status="404"
                title="404"
                subTitle="非常抱歉，你要找的页面可能不见了"
                extra={<Button type="primary" onClick={back}>返回上一页</Button>}
            />
        </div>
    )
}
