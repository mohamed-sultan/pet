import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Form, Input, Select, Card, Typography, Skeleton, Row, Col, notification, Breadcrumb } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { usePet, useFetchPet } from '../../service/usePet';
import { useRandomImage } from '../../service/useRandomImage';
import { useThemeStore } from '../../store/themeStore';

const { Title } = Typography;

interface UpdatePetForm {
  petId: string;
  name: string;
  status: 'available' | 'pending' | 'sold';
}

const UpdatePet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updatePetMutation } = usePet();
  const { data: pet, isLoading } = useFetchPet(id || '');
  const { data: petImage, isLoading: imageLoading } = useRandomImage(id || '');
  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<UpdatePetForm>({
    mode: 'onChange',
    defaultValues: {
      petId: id || '',
      name: '',
      status: 'available',
    },
  });
  const [api, contextHolder] = notification.useNotification();
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    if (pet) {
      reset({
        petId: id || '',
        name: pet.name || '',
        status: pet.status || 'available',
      });
    }
  }, [pet, reset, id]);

  const onSubmit = (data: UpdatePetForm) => {
    if (!id) return;
    updatePetMutation.mutate(
      { id, name: data.name, status: data.status, petId:id || '' },
      {
        onError: () => {
          api.error({
            message: `Error updating pet`,
            description: 'Some thing went wrong',
            placement: 'topRight',
            type: 'error',
          });
        },
        onSuccess: () => {
          api.info({
            message: `Pet updated successfully`,
            description: 'Pet updated successfully',
            placement: 'topRight',
            type: 'success',
          });
          setTimeout(() => {
           navigate(`/pet/${id}`);
          }, 1000);
        },
      }
    );
  };

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 4 }} className="update-pet-skeleton" />;
  }

  return (
    <div className={`update-pet-bg${isDark ? ' dark' : ''}`}>
      {contextHolder}
      <div className="update-pet-container">
        <Breadcrumb style={{fontWeight:'bold'}} className="pet-breadcrumb">
          <Breadcrumb.Item><a onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>Home</a></Breadcrumb.Item>
          <Breadcrumb.Item><a onClick={() => navigate(`/pet/${id}`)} style={{ cursor: 'pointer' }}>Pet Details</a></Breadcrumb.Item>
          <Breadcrumb.Item>Update Pet</Breadcrumb.Item>
        </Breadcrumb>
        <Row style={{marginTop:'30px'}} justify="center">
          <Col xs={24} className="update-pet-col">
     
            <Card
              bordered={false}
              className={`update-pet-card${isDark ? ' dark' : ''}`}
            >
              {imageLoading ? (
                <Skeleton.Image className="update-pet-image-skeleton" active />
              ) : <img
                src={petImage}
                alt={pet?.name}
                className="update-pet-image"
              />}
              <div className="update-pet-form-wrapper">
                <Title level={2} style={{color:'black'}} >Update Pet</Title>
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>                  
                  <Form.Item label="Name" validateStatus={errors.name ? 'error' : ''} help={<span className="update-pet-error-help">{errors.name?.message}</span>}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: 'Name is required' }}
                      render={({ field }) => (
                        <Input {...field} size="large" className="update-pet-input" />
                      )}
                    />
                  </Form.Item>
                  <Form.Item label="Status" validateStatus={errors.status ? 'error' : ''} help={<span className="update-pet-error-help">{errors.status?.message}</span>}>
                    <Controller
                      name="status"
                      control={control}
                      rules={{ required: 'Status is required' }}
                      render={({ field }) => (
                        <Select {...field} size="large" className="update-pet-select">
                          <Select.Option value="available">Available</Select.Option>
                          <Select.Option value="pending">Pending</Select.Option>
                          <Select.Option value="sold">Sold</Select.Option>
                        </Select>
                      )}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      className="update-pet-btn"
                      style={{backgroundColor:'blue'}}
                      loading={isSubmitting || updatePetMutation.status === 'pending'} 
                    >
                      Update Pet
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UpdatePet; 