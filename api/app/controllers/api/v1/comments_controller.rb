class Api::V1::CommentsController < ApplicationController
  def show
    comments = User.joins(:comments)
                   .select('comments.id as comment_id, comments.event_id, comments.user_id, comments.comment, users.id as id,users.name, users.image')
                   .where("comments.event_id = #{params[:event_id]}").order(comment_id: 'ASC')
    render json: comments, status: :ok
  end

  def create
    comment = current_api_v1_user.comments.build(event_id: params[:event_id], comment: params[:comment])
    if comment.save!
      render json: comment, status: :ok
    else
      render json: comment.errors
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy!
      render json: comment, status: :ok
    else
      render json: comment.errors
    end
  end
end
