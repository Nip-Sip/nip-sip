import React from 'react'
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton
} from 'react-share'
import { EmailIcon, FacebookIcon, RedditIcon, TwitterIcon } from 'react-share'

// https://www.npmjs.com/package/react-share

const Share = () => {
  return (
    <>
      <h2>Share Buttons...</h2>
      <TwitterShareButton url="www.google.com" title="nice">
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <RedditShareButton url="www.google.com" title="yooo" />
    </>
  )
}

export default Share
