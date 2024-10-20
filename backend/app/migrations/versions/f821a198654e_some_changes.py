"""some changes

Revision ID: f821a198654e
Revises: 9c46338b6665
Create Date: 2024-09-26 16:54:07.536163

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f821a198654e'
down_revision = '9c46338b6665'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('invited_person_to_project', schema=None) as batch_op:
        batch_op.drop_column('description')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('invited_person_to_project', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.VARCHAR(length=256), autoincrement=False, nullable=True))

    # ### end Alembic commands ###
