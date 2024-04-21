import React from 'react';
import { Segmented, ConfigProvider } from 'antd';

const CustomDeptSegmented = ({value, onChange, block=false, trackBg="#ffffff"}) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Segmented: {
                        trackBg: trackBg,
                        itemSelectedBg: '#64b5f6',
                        trackPadding: 4
                    },
                },
            }}
        >
            <Segmented options={['CSE', 'CE', 'EEE']} size="large" value={value} onChange={onChange} block={block} />
        </ConfigProvider>
    )
}

export default CustomDeptSegmented