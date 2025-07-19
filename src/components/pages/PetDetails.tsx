import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Badge, Skeleton, Row, Col, Breadcrumb } from 'antd';
import { useRandomImage } from '../../service/useRandomImage';
import { useFetchPet } from '../../service/usePet';
import { useThemeStore } from '../../store/themeStore';


const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'green';
    case 'pending':
      return 'orange';
    case 'adopted':
      return 'blue';
    default:
      return 'default';
  }
};

const PetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: pet, isLoading: loading, error } = useFetchPet(id || '');

  // Use React Query to get a random image
  const { data: catImageUrl, isLoading: imageLoading } = useRandomImage(id || '');

  // removed manual fetch, using useFetchPet

  const isDark = useThemeStore((state) => state.isDark);

  if (loading || imageLoading) {
    return (
      <div className="skeletonWrapper">
        <Skeleton
          active
          paragraph={{ rows: 8 }}
          className="skeleton"
        />
      </div>
    );
  }
  if (error || !pet) {
    return (
      <div className="errorWrapper">
        <div className="errorContent">
          <Typography.Title level={2}>Pet not found</Typography.Title>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`petDetailsWrapper${isDark ? ' dark' : ''}`}
    >
      <div className="petDetailsContainer">
        <Breadcrumb style={{fontWeight:'bold'}} >
          <Breadcrumb.Item  ><a onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>Home</a></Breadcrumb.Item>
          <Breadcrumb.Item>Pet Details</Breadcrumb.Item>
          <Breadcrumb.Item>{pet?.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Row style={{marginTop:'30px'}} gutter={[32, 32]}>
          <Col xs={24}>
            <Card
              bordered={false}
              className="petCard"
            >
              {catImageUrl ? (
                <img
                  src={catImageUrl}
                  alt={pet?.name}
                  className="petImage"
                />
              ) : null}
              { !catImageUrl ? (
                <img
                  src={'https://via.placeholder.com/500x300?text=No+Image'}
                  alt={pet?.name}
                  className="petImagePlaceholder"
                />
              ) : null}
              <div className="statusTagsWrapper">
                <Badge
                  color={getStatusColor(pet?.status)}
                  text={pet?.status?.charAt(0).toUpperCase() + pet?.status?.slice(1)}
                  className={
                    `statusBadge${pet?.status === 'available'
                      ? ' statusAvailable'
                      : pet?.status === 'pending'
                      ? ' statusPending'
                      : pet?.status === 'sold'
                      ? ' statusSold'
                      : ''}`
                  }
                />
                {pet?.tags && pet?.tags.length > 0 && (
                  <div className="tagsWrapper">
                    {pet.tags.map((tag: any) => (
                      <Badge key={tag?.id} color="purple" text={tag?.name} className="tagBadge" />
                    ))}
                  </div>
                )}
              </div>
              <div className="petInfoWrapper">
                <Typography.Title level={2} className="petName">{pet?.name}</Typography.Title> 
                <div className="categoryWrapper">
                  <Typography.Text type="secondary" className="categoryLabel">Category:</Typography.Text>
                  <Typography.Text className="categoryValue">{pet?.category?.name || 'No category'}</Typography.Text>
                </div>
                <div className="idWrapper">
                  <Typography.Text type="secondary" className="idLabel">ID:</Typography.Text>
                  <Typography.Text className="idValue">{pet?.id}</Typography.Text>
                </div>
              </div>
              <div className="updateButtonWrapper">
                <Button
                  type="primary"
                  onClick={() => navigate(`/update-pet/${pet?.id}`)}
                >
                  Update Pet
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PetDetails; 