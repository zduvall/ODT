"""Update customer stripeSubscriptionId to stripeSubId and add subType

Revision ID: 40ac2c7ea0d9
Revises: b6fdbae272eb
Create Date: 2021-04-06 13:03:06.713107

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '40ac2c7ea0d9'
down_revision = 'b6fdbae272eb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('customers', sa.Column('stripeSubId', sa.String(length=255), nullable=True))
    op.add_column('customers', sa.Column('subType', sa.String(length=30), nullable=True))
    op.drop_constraint('customers_stripeSubscriptionId_key', 'customers', type_='unique')
    op.create_unique_constraint(None, 'customers', ['stripeSubId'])
    op.drop_column('customers', 'stripeSubscriptionId')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('customers', sa.Column('stripeSubscriptionId', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'customers', type_='unique')
    op.create_unique_constraint('customers_stripeSubscriptionId_key', 'customers', ['stripeSubscriptionId'])
    op.drop_column('customers', 'subType')
    op.drop_column('customers', 'stripeSubId')
    # ### end Alembic commands ###
