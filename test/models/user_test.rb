# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@sample.com",
      role: User.roles[:administrator],
      password: "sample",
      password_confirmation: "sample"
    )
  end

  def test_user_valid
    assert @user.valid?
  end

  def test_user_invalid_without_first_name
    @user.first_name = ""
    assert_not @user.valid?
    @user.save
    assert_equal ["First name can't be blank"],
      @user.errors.full_messages
  end

  def test_user_invalid_without_last_name
    @user.last_name = ""
    assert_not @user.valid?
    @user.save
    assert_equal ["Last name can't be blank"],
      @user.errors.full_messages
  end

  def test_reject_first_name_of_invalid_length
    @user.first_name = "a" * 60
    assert @user.invalid?
    @user.save
    assert_equal ["First name is too long (maximum is 50 characters)"],
      @user.errors.full_messages
  end

  def test_reject_last_name_of_invalid_length
    @user.last_name = "a" * 60
    assert @user.invalid?
    @user.save
    assert_equal ["Last name is too long (maximum is 50 characters)"],
      @user.errors.full_messages
  end

  def test_user_should_be_not_be_valid_and_saved_without_email
    @user.email = ""
    assert_not @user.valid?

    @user.save
    assert_equal ["Email can't be blank", "Email is invalid"],
      @user.errors.full_messages
  end

  def test_user_should_not_be_valid_and_saved_if_email_not_unique
    @user.save!

    test_user = @user.dup
    assert_not test_user.valid?

    assert_equal ["Email has already been taken"],
      test_user.errors.full_messages
  end

  def test_reject_email_of_invalid_length
    @user.email = "#{'a' * 50}@test.com"
    assert @user.invalid?
  end

  def test_email_saving_in_lower_case
    @user.email = "SAM@SAMPLE.COM"
    @user.save!
    assert_equal "sam@sample.com", @user.email
  end

  def test_validation_should_accept_valid_addresses
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org
                      first.last@example.in user+one@example.ac.in]

    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  def test_validation_should_reject_invalid_addresses
    invalid_emails = %w[user@example,com user_at_example.org user.name@example.
                        @sam-sam.com sam@sam+exam.com fishy+#.com]

    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end

  def test_user_create_with_email_different_case
    @user.save!
    assert_raises ActiveRecord::RecordNotUnique do
      User.create!(
        first_name: "John",
        last_name: "Smith",
        email: "SAM@sample.com",
        role: User.roles[:administrator],
        password: "sample",
        password_confirmation: "sample"
      )
    end
  end

  def test_user_should_be_not_be_valid_and_saved_without_role
    @user.role = nil
    assert_not @user.valid?
  end

  def test_user_should_be_invalid_with_an_invalid_role
    assert_raises ArgumentError do
      @user.role = "sales"
      @user.save
    end
  end

  def test_administrator_user_should_be_invalid_without_password
    @user.password = nil
    assert @user.invalid?
    @user.save

    assert_equal ["Password can't be blank"],
      @user.errors.full_messages
  end

  def test_administrator_user_should_be_invalid_without_password_confirmation
    @user.password_confirmation = nil
    assert @user.invalid?
    @user.save

    assert_equal ["Password confirmation can't be blank"],
      @user.errors.full_messages
  end

  def test_administrator_user_should_be_invalid_with_password_mismatch
    @user.password = "password"
    @user.password_confirmation = "password1"
    assert @user.invalid?
    @user.save

    assert_equal "Password confirmation doesn't match Password",
      @user.errors.full_messages.first
  end

  def test_administrator_user_should_be_invalid_without_minimum_password_length
    @user.password = "pass"
    @user.password_confirmation = "pass"
    assert_not @user.save

    assert_equal ["Password is too short (minimum is 6 characters)"],
      @user.errors.full_messages
  end
end
