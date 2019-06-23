import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import './musicDisplay.css'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  summaryContent: { flexWrap: 'wrap' },
  detailRoot: { flexWrap: 'wrap', maxHeight: 475, overflowY: 'scroll' },
})

const detailStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: 12,
  marginTop: 12,
}

const MusicDisplay = ({ currentArtist, service, albums }) => {
  const classes = useStyles();

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="music-summary"
        id="music-summary"
        classes={{ content: classes.summaryContent }}
      >
        <Typography style={{ width: '100%' }} variant='h3' gutterBottom>{`${currentArtist} on ${service}`}</Typography>
        <Typography style={{ width: '100%' }} variant='h3' gutterBottom>
          { `${albums.length} Album${albums.length === 1 ? '' : 's'}` }
        </Typography>
      </ExpansionPanelSummary>
      { albums.length > 0 &&
        <ExpansionPanelDetails classes={{ root: classes.detailRoot }}>
          {albums.map(album => {
            return <div key={album.id} style={{ width: '100%', textAlign: 'left' }}>
              <div style={detailStyle}>
                <a href={album.external_urls.spotify} target='_blank' rel="noopener noreferrer">
                  <img src={album.images[1].url} alt='album cover' height='100' width='100'></img>
                </a>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 25, width: '75%' }}>
                  <div style={{ flexBasis: 280, display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography variant='h6'>{album.name}</Typography>
                  </div>
                  <Typography variant='h6' className='music-display__tracks'>{`${album.total_tracks} Tracks`}</Typography>
                  <Typography variant='h6' className='music-display__date'>{album.release_date.substring(0, 4)}</Typography>
                </div>
              </div>
              <Divider variant="middle" />
            </div>
          })}
        </ExpansionPanelDetails>
      }
    </ExpansionPanel>    
  )
};

export default MusicDisplay;