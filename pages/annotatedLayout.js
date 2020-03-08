import { Card, Layout, Page } from '@shopify/polaris';

class AnnotatedLayout extends React.Component {
  state = {};

  render() {
    return (
      <Page>
        <Layout>
          <Layout.AnnotatedSection
            title="Default discount"
            description="Add a product to Sample App, it will automatically be discounted."
          >
            <Card sectioned>
              <div>Card</div>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );
  }
}

export default AnnotatedLayout;
