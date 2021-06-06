import React, { useState } from 'react';

import {
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button
} from 'shards-react';

interface Props {
    header: string;
    title: string;
    body: string;
    hyperlink: string;
    assetName: string;
    footer: string;
}

export const CardComponent: React.FC<Props> = ({
    header,
    title,
    body,
    assetName,
    hyperlink,
    footer
}) => {
    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener, noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    return (
        <Card className="single-card-class" style={{ maxWidth: '200px' }}>
            <CardHeader style={{ height: '73px' }}>{header}</CardHeader>
            <CardImg
                className="card-img-class"
                src={require(`../logos/${assetName}`)}
            />
            <CardBody style={{ height: '226px', width: '196px' }}>
                <CardTitle>{title}</CardTitle>
                <p>{body}</p>
                <Button
                    theme="dark"
                    onClick={() => openInNewTab(hyperlink)}
                    style={{
                        position: 'absolute',
                        bottom: '85px',
                        height: '62px',
                        width: '156px'
                    }}
                >
                    Visit {title}!
                </Button>
            </CardBody>
            <CardFooter>
                {footer} 0 {/* Hardcoded for now*/}
                <Button theme="dark" disabled size="sm">
                    Go To Reviews
                </Button>
            </CardFooter>
        </Card>
    );
};
