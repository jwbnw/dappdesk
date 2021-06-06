import React from 'react';
import { Button, Collapse } from 'shards-react';

interface Props {
    title: string;
    info: string;
    toggleName: string;
    hyperLink?: string;
    hyperLinkText?: string;
}

export const CollapseInfoComponent: React.FC<Props> = ({
    title,
    info,
    toggleName,
    hyperLink,
    hyperLinkText
}) => {
    const [collapse, setCollapse] = React.useState(false);

    function toggle() {
        setCollapse(!collapse);
    }

    const ShouldShowHyperLinkBottom = () => {
        if (hyperLink) {
            return (
                <a style={{ color: 'green' }} href={hyperLink}>
                    {hyperLinkText}
                </a>
            );
        } else {
            return <div></div>;
        }
    };
    return (
        <div className="collapse-container-div">
            <Button
                className="text-color-class"
                theme="light"
                outline
                onClick={toggle}
            >
                {toggleName}
            </Button>
            <Collapse open={collapse}>
                <br />
                <div className="collapse-text-div">
                    <h5 className="text-color-class">{title}</h5>
                    <span className="text-color-class">{info}</span>
                    <ShouldShowHyperLinkBottom />
                </div>
            </Collapse>
        </div>
    );
};
