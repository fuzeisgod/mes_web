import React from 'react'
import {
    Spin
} from 'antd'
import './loading.less'

export default function Loading() {
    return (
        <div className="loading-page">
            <Spin size="large" tip="Loading..." />
        </div>
    )
}
