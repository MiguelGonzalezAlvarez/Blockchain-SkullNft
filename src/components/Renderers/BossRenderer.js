import React from "react";

const BossRenderer = ({ bossInfo = null, size = 200, style }) => {
    const bossStyle = {
        width: "100%",
        height: "100%",
        position: "absolute"
    }

    return (
        <div style={{ minWidth: size, minHeight: size, width: '20rem', height: '20rem', position: "relative", ...style }}>
            <img alt={"back"} src={bossInfo.imageURI} style={bossStyle} />
        </div>
    );
}

export default BossRenderer