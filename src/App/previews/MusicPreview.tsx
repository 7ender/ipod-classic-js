import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { previewSlideRight } from 'animation';
import { KenBurns, LoadingIndicator } from 'components';
import { motion } from 'framer-motion';
import { ALBUMS, AlbumsQuery } from 'queries';
import styled from 'styled-components';

const Container = styled(motion.div)`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const MusicPreview = () => {
  const [artworkUrls, setArtworkUrls] = useState<string[]>([]);
  const { loading, error, data } = useQuery<AlbumsQuery>(ALBUMS);

  useEffect(() => {
    if (data && data.albums && !error) {
      setArtworkUrls(data.albums.map(result => result.artwork));
    }
  }, [data, error]);

  return (
    <Container {...previewSlideRight}>
      {loading ? (
        <LoadingIndicator backgroundColor="linear-gradient(180deg, #B1B5C0 0%, #686E7A 100%)" />
      ) : (
        <KenBurns urls={artworkUrls} />
      )}
    </Container>
  );
};

export default MusicPreview;
