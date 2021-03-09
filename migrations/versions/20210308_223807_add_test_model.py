"""Add test model

Revision ID: 42bcbc6f68c9
Revises: 63f3d99c4fda
Create Date: 2021-03-08 22:38:07.960591

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '42bcbc6f68c9'
down_revision = '63f3d99c4fda'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('clientId', sa.Integer(), nullable=False),
    sa.Column('testCode', sa.String(length=20), nullable=False),
    sa.Column('res', sa.JSON(), nullable=True),
    sa.Column('timeSent', sa.DateTime(), nullable=True),
    sa.Column('timeComp', sa.DateTime(), nullable=True),
    sa.Column('userSeen', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['clientId'], ['clients.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tests')
    # ### end Alembic commands ###
