defmodule Backend.Posts.PostsTest do
  use Backend.DataCase, async: true
  use Backend.MoxCase

  alias Backend.Posts.{Post, Posts}

  import Backend.Factory

  setup do
    business_profile = insert(:business_profile)

    {:ok, tmp} = Briefly.create()
    File.write!(tmp, "test file content")

    asset = %{file_path: tmp, filename: "uploads/test.png"}

    params = %{
      description: "I am looking for a truck driver to drive this truck",
      business_profile_id: business_profile.id,
      asset: asset
    }

    %{
      params: params,
      business_profile: business_profile
    }
  end

  describe "create/1" do
    test "successfully creates a post", %{params: params, business_profile: business_profile} do
      assert {:ok, %Post{} = post} = Posts.create(params)

      preloaded_post = Repo.preload(post, :asset)

      assert preloaded_post.business_profile_id == business_profile.id
      assert is_binary(preloaded_post.asset.url)
    end

    test "returns error for invalid params", %{params: params} do
      params = Map.delete(params, :description)

      assert {:error, :post, %Ecto.Changeset{}} = Posts.create(params)
    end
  end
end
