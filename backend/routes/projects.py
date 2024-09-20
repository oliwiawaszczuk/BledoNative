from flask import request, jsonify

from database.models import Project, Person_in_project, Session, Invited_person_to_project, Permission
from lib import db
from sqlalchemy import desc


def create_projects_routes(app):
    @app.route('/api/new_project', methods=['POST'])
    def create_projects():
        data = request.get_json()
        name = data['name']
        description = data['description']
        user_id = data['user_id']

        new_project = Project(name, description, user_id)
        db.session.add(new_project)
        db.session.commit()

        return jsonify({"status": "success"}), 200

    @app.route('/api/get_projects/<token>')
    def get_projects(token):
        user_id = Session.query.filter_by(token=token).first().user_id

        projects_owner = [{
                "id": project.id,
                "name": project.name,
                "description": project.description
             } for project in Project.query.filter_by(creator_user_id=user_id).order_by(desc(Project.sort_order)).all()]

        projects_in = [{
            "id": project.project_id,
            "name": Project.query.filter_by(id=project.project_id).first().name,
            "description": Project.query.filter_by(id=project.project_id).first().description,
        } for project in Person_in_project.query.filter_by(user_id=user_id).all()]

        projects_invited = [{
            "id": project.project_id,
            "name": Project.query.filter_by(id=project.project_id).first().name,
            "project_description": Project.query.filter_by(id=project.project_id).first().description,
            "invited_by": project.invited_by,
            "invite_description": project.description,
        } for project in Invited_person_to_project.query.filter_by(user_id=user_id).all()]

        return jsonify({"projects_owner": projects_owner, "projects_in": projects_in, "projects_invited": projects_invited}), 200

    @app.route('/api/accept_invitation_to_project/<id>')
    def accept_invitation_to_project(id):
        invitation = Invited_person_to_project.query.filter_by(project_id=int(id)).first()
        if invitation:
            user_id = invitation.user_id
            project_id = invitation.project_id
            db.session.delete(invitation)
            db.session.commit()

            permission = Permission()
            db.session.add(permission)
            db.session.commit()
            project_in = Person_in_project(project_id=project_id, user_id=user_id, permission_id=permission.id)
            db.session.add(project_in)
            db.session.commit()
        return jsonify({}), 200

    @app.route('/api/reject_invitation_to_project/<id>')
    def reject_invitation_to_project(id):
        invitation = Invited_person_to_project.query.filter_by(project_id=int(id)).first()
        if invitation:
            db.session.delete(invitation)
            db.session.commit()

        return jsonify({}), 200

    @app.route('/api/add_new_project/<token>', methods=['POST'])
    def add_new_project(token):
        user_id = Session.query.filter_by(token=token).first().user_id
        data = request.get_json()
        new_project_name = data.get('newProjectName')
        new_project_description = data.get('newProjectDescription')

        sort_order = max([project.sort_order for project in Project.query.filter_by(creator_user_id=user_id).all()] + [0]) + 1
        project = Project(new_project_name, new_project_description, user_id, sort_order)
        db.session.add(project)
        db.session.commit()

        return jsonify({}), 200

    @app.route('/api/try_move_card/<project_id>/<direction>')
    def try_move_card(project_id, direction):
        project = Project.query.filter_by(id=project_id).first()
        direction_int = 1 if direction == 'up' else -1
        project_to_swap = Project.query.filter_by(creator_user_id=project.creator_user_id, sort_order=(project.sort_order + direction_int)).first()
        if project_to_swap:
            temp_sort_order = project.sort_order
            project.sort_order = project_to_swap.sort_order
            project_to_swap.sort_order = temp_sort_order

            db.session.commit()

        return jsonify({}), 200
