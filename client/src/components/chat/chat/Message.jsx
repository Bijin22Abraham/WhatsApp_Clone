import { useContext } from 'react';

import { Box, styled, Typography } from '@mui/material';
import { GetApp as GetAppIcon } from '@mui/icons-material';

import { AccountContext } from '../../../context/AccountProvider';

import { downloadMedia, formatDate } from '../../../utils/common-utils';
import { iconPDF, iconDOC } from '../../../constants/data';

const Wrapper = styled(Box)`
    background: #FFFFFF;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;
    
const Own = styled(Box)`
    background: #dcf8c6;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    margin-left: auto;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;

const Message = ({ message }) => {
    const { account } = useContext(AccountContext);

    return (
        <>
        {
            account.sub === message.senderId ? 
                <Own>
                    {
                        message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }
                </Own>
            : 
                <Wrapper>
                    {
                        message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }
                </Wrapper>
        }
        
        </>
    )
}

const TextMessage = ({ message }) => {
    
    return (
        <>
            <Text>{message.text}</Text>
            <Time>{formatDate(message.createdAt)}</Time>
        </>
    )
}

const ImageMessage = ({ message }) => {

    return (
        <div style={{ position: 'relative' }}>

{
    message?.text && (
        (message.text.match(/\.(png|jpg|jpeg|gif|webp)$/i)) ? ( // Image files
            <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt={message.text} />
        ) : (
            (message.text.match(/\.(pdf|docx)$/i)) ? ( // PDF and DOC files
                <div style={{ display: 'flex' }}>
                    <img src={message.text.includes('.pdf') ? iconPDF : iconDOC} alt="file-icon" style={{ width: 80 }} />
                    <Typography style={{ fontSize: 14 }}>{message.text.split("/").pop()}</Typography>
                </div>
            ) : (
                (message.text.match(/\.(mp4|avi|mov)$/i)) ? ( // Video files
                    <video controls style={{ width: 400, height: '100%', objectFit: 'cover' }}>
                        <source src={message.text} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    (message.text.match(/\.(mp3|wav|aac)$/i)) ? ( // Audio files
                        <audio controls>
                            <source src={message.text} type="audio/mpeg" />
                            Your browser does not support the audio tag.
                        </audio>
                    ) : null
                )
            )
        )
    )
}

         
            <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <GetAppIcon 
                    onClick={(e) => downloadMedia(e, message.text)} 
                    fontSize='small' 
                    style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%' }} 
                />
                {formatDate(message.createdAt)}
            </Time>
        </div>
    )
}


export default Message;